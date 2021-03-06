require 'uuid'

class Author::Widget < ActiveRecord::Base

  belongs_to :author_widget_category,
             class_name: 'Author::WidgetCategory',
             foreign_key: :widget_category_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget'

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           through: :author_site_storage_widgets

  accepts_nested_attributes_for :author_site_storage_widgets, allow_destroy: true

  validates :resource, presence: true
  validates :width, presence: true, numericality: true
  validates :height, presence: true, numericality: true

  def self.fetch_data(user, category=nil)
    category.nil? ?
        joins(:author_item).
            where('visible=true AND (public=true OR user_id=?)', user.id).
            order(name: :asc) :
        includes(:author_widget_category).
        joins(:author_item, :author_widget_category).
            where('visible=true AND (public=true OR user_id=?) AND author_widget_categories.id=?', user.id, category.id).
            order(name: :asc)
  end

  def fetch_categories(user)
    Author::WidgetCategory.fetch_data(user)
  end

  def self.fetch_category(user, category_id)
    Author::WidgetCategory.fetch_data(user).find(category_id)
  end

  def self.fetch_site_widgets(key)
    user = User.current
    if key.nil?
      fetch_data(user)
    else
      site_storage = Author::SiteStorage.fetch_data(user).where(key: key).first
      site_storage.author_widgets.
          joins(:author_item).
          where('visible=true AND (public=true OR user_id=?)', user.id).
          order(name: :asc) unless site_storage.nil?
    end
  end

  def self.fetch_category_site_widgets(category, site)
    user = User.current
    if site.nil?
      category.author_widgets.
          joins(:author_item).
          where('visible=true AND (public=true OR user_id=?)', user.id).
          order(name: :asc)
    else
      site.author_widgets.
          joins(:author_item, :author_widget_category).
          where('visible=true AND (public=true OR user_id=?) AND widget_category_id=?', user.id, category.id).
          order(name: :asc)
    end
  end

  def self.build_data(params, category)

    uuid = UUID.new

    widget = new(params)
    widget.uuid = uuid.generate
    widget.widget_category_id = category.id
    widget.item_id = Author::Item.create_and_get.id

    widget
  end

end
