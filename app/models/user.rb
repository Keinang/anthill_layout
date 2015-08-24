class User < ActiveRecord::Base

  TEMP_EMAIL_PREFIX = 'change@me'
  TEMP_EMAIL_REGEX = /\Achange@me/

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :timeoutable, :omniauthable,
         omniauth_providers: [
             # :digitalocean,
             # :twitter,
             :facebook,
             # :google,
             # :amazon,
             # :github
             # :linkedin
         ]

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           dependent: :destroy

  has_many :author_widgets,
           class_name: 'Author::Widget',
           dependent: :destroy

  has_many :author_site_versions,
           class_name: 'Author::SiteVersion',
           dependent: :destroy

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget',
           dependent: :destroy

  has_many :author_site_types,
           class_name: 'Author::SiteType',
           dependent: :destroy

  has_many :author_widget_categories,
           class_name: 'Author::WidgetCategory',
           dependent: :destroy

  has_many :user_logs,
           class_name: 'UserLog',
           dependent: :destroy

  has_many :error_logs,
           class_name: 'ErrorLog',
           dependent: :destroy,
           through: :user_logs

  has_many :vulnerability_storages,
           class_name: 'VulnerabilityStorage',
           dependent: :destroy,
           through: :author_site_storages

  belongs_to :role

  before_create :set_default_role

  validates_format_of :email, without: TEMP_EMAIL_REGEX, on: :update

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|

      user.provider = auth.provider
      user.uid = auth.uid
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)

      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      # assuming the user model has a name
      user.name = auth.info.name
      # assuming the user model has an image
      user.image = auth.info.image
      user.save!
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session['devise.facebook_data'] && session['devise.facebook_data']['extra']['raw_info']
        user.email = data['email'] if user.email.blank?
      end
    end
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end

  private

  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end

end
