require 'dotenv'

Dotenv.load

module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      site.config['metrika'] = ENV['METRIKA_APP']
    end
  end
end
