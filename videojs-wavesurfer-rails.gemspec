
# frozen_string_literal: true

lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'videojs-wavesurfer/rails/version'

Gem::Specification.new do |gem|
  gem.name          = 'videojs-wavesurfer-rails'
  gem.version       = VideojsWavesurfer::Rails::VERSION
  gem.authors       = ['Emmanuel Cousin']
  gem.email         = ['emmanuel_cousin@hotmail.fr']

  gem.summary       = 'https://cdnjs.com/libraries/videojs-wavesurfer'
  gem.description   = 'videojs-wavesurfer plugin for the rails asset pipeline'
  gem.homepage      = 'https://github.com/EmCousin/videojs-wavesurfer-rails'
  gem.license       = 'MIT'

  gem.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  gem.bindir        = 'exe'
  gem.executables   = gem.files.grep(%r{^exe/}) { |f| File.basename(f) }
  gem.require_paths = ['lib']

  gem.add_development_dependency 'bundler', '~> 1.9'
  gem.add_development_dependency 'rake', '~> 10.0'
end
