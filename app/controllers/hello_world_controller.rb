# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger" }
  end

  def markdown_editor
    @markdown_editor_props = { initialContent: "# Welcome to the Heavy Markdown Editor\n\nStart typing your markdown here..." }
  end
end
