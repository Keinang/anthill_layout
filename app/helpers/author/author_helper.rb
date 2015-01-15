module Author::AuthorHelper

  def link_to_destroy(item, name)
    link_to 'Destroy', item, method: :delete, data: {confirm: "Are you sure want to delete: #{name}?"}
  end

  def render_title
    content_tag(:div, class: 'title') do
      if action_name === 'index'
        concat content_tag(:h1, "#{controller_name.humanize}: #{action_name} (#{@resource[:items]})")
        concat link_to("Add #{controller_name.humanize.singularize}", @resource[:path])
      end
      concat content_tag(:p, notice, id: 'notice')
    end
  end

  def render_text_field(f, name, disabled=false)
    render_field(:text_field, f, name, disabled)
  end

  def render_text(name, value)
    content_tag(:div, class: 'field') do
      concat label_tag name
      concat text_field_tag(name, value, {disabled: true})
    end
  end

  def render_text_area(f, name, disabled=false)
    render_field(:text_area, f, name, disabled)
  end

  def render_checkbox(f, name, disabled=false)
    content_tag(:div, class: 'field') do
      concat f.check_box(name, {disabled: disabled})
      concat f.label name
    end
  end

  def render_radio_button(f, name, value, checked=false, disabled=false)
    content_tag(:div, class: 'field') do
      concat f.radio_button(name, value, {disabled: disabled, checked: checked})
      concat f.label name
    end
  end

  def render_number_field(f, name, disabled=false)
    render_field(:number_field, f, name, disabled)
  end

  def render_collection(f, name, opts)
    content_tag(:div, class: 'field') do
      concat f.label name
      concat f.collection_select(opts[:id], opts[:collection], opts[:index], opts[:value])
    end
  end

  def render_submit(f)
    content_tag(:div, class: 'actions') do
      f.submit
    end
  end

  def render_notification(item)
    content_tag(:div, class: 'error_explanation') do
      concat content_tag(:h2, "#{pluralize(item.errors.count, 'error')}: prohibited this item from being saved:")
      concat content_tag(:ul, item.errors.full_messages.collect { |message| "<li>#{message}</li>" }.join.html_safe)
    end if item.errors.any?
  end

  def render_form
    content_tag(:div) do
      concat link_to '&#10157;'.html_safe, {controller: controller_name}, class: 'back'
      concat content_tag(:h1, "#{action_name.humanize} #{controller_name.humanize}")
      concat render 'form'
    end
  end

  private

  def render_field(type, f, name, disabled)
    content_tag(:div, class: 'field') do
      concat f.label name
      concat f.send(type, name, {disabled: disabled, placeholder: "Enter #{name.to_s.humanize}"})
    end
  end

end
