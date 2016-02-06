# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( search.js base.css pages.css base.js pages.js)
# Rails.application.config.assets.precompile += [/.*\.png/,/.*\.ico/,/.*\.jpg/,/.*\.js/,/.*\.scss/,/.*\.css/]
# Rails.application.config.assets.precompile += [/profile.*/]


# Rails.application.config.assets.precompile += [/profile.*/]

Rails.application.config.assets.precompile += %w( bootstrap.min.css zabuto_calendar.min.css style.css bootstrap.min.js zabuto_calendar.min.js custom.js)

Rails.application.config.assets.precompile += %w( activities.css activities.js)
Rails.application.config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
Rails.application.config.assets.precompile += ['angle/themes/theme-a.css',
                                               'angle/themes/theme-b.css',
                                               'angle/themes/theme-c.css',
                                               'angle/themes/theme-d.css',
                                               'angle/themes/theme-e.css',
                                               'angle/themes/theme-f.css',
                                               'angle/themes/theme-g.css',
                                               'angle/themes/theme-h.css'
]
# Controller assets
Rails.application.config.assets.precompile += [
    # Scripts
    'charts.js',
    'dashboard.js',
    'documentation.js',
    'elements.js',
    'extras.js',
    'forms.js',
    'maps.js',
    'multilevel.js',
    'pages.js',
    'tables.js',
    'widgets.js',
    'blog.js',
    'ecommerce.js',
    'forum.js',
    'projects.js',
    'editable_datatable_view.js',
    'settings/water_usage/variables.js',
    'settings/water_usage/meter_types.js',
    'settings/water_usage/measurement_units.js',
    'settings/water_usage/hot_water_options.js',
    'settings/unit/building_types.js',
    'settings/unit/fixture_types.js',
    'settings/unit/types.js',
    'settings/phases/building_installs.js',
    'settings/phases/contracts.js',
    'settings/phases/post_installs.js',
    'settings/phases/projects.js',
    'settings/phases/unit_installs.js',
    'settings/inventory/products.js',
    'settings/census_data/building_population_estimates.js',
    'settings/census_data/person_water_usages.js',
    'business_units.js',
    'users.js',
    # Stylesheets
    'charts.css',
    'dashboard.css',
    'documentation.css',
    'elements.css',
    'extras.css',
    'forms.css',
    'maps.css',
    'multilevel.css',
    'pages.css',
    'tables.css',
    'widgets.css',
    'blog.css',
    'ecommerce.css',
    'forum.css',
    'projects.css',
    'editable_datatable_view.css',
    'settings/water_usage/variables.css',
    'settings/water_usage/meter_types.css',
    'settings/water_usage/measurement_units.css',
    'settings/water_usage/hot_water_options.css',
    'settings/unit/building_types.css',
    'settings/unit/fixture_types.css',
    'settings/unit/types.css',
    'settings/phases/building_installs.css',
    'settings/phases/contracts.css',
    'settings/phases/post_installs.css',
    'settings/phases/projects.css',
    'settings/phases/unit_installs.css',
    'settings/inventory/products.css',
    'settings/census_data/building_population_estimates.css',
    'settings/census_data/person_water_usages.css',
    'business_units.css',
    'users.css'
]

Rails.application.config.assets.precompile += [/.*\.png/,/.*\.ico/,/.*\.jpg/]
