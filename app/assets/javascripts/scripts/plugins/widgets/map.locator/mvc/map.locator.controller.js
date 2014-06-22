/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'lib/jquery/jquery.knob',
        'modules/Geolocation',
        'plugins/plugin',
        'plugins/widgets/widget.content.controller'
    ],

    /**
     * Define Map locator controller
     * @param knob
     * @param {BaseGeolocation} BaseGeolocation
     * @param {PluginController} PluginController
     * @param {WidgetContentController} WidgetContentController
     * @returns {*}
     */
        function defineMapLocatorController(knob, BaseGeolocation, PluginController, WidgetContentController) {

        /**
         * Define MapLocator controller
         * @class MapLocatorController
         * @extends BaseGeolocation
         * @extends PluginController
         * @extends WidgetContentController
         * @constructor
         */
        var MapLocatorController = function MapLocatorController() {
        };

        return MapLocatorController.extend('MapLocatorController', {

                /**
                 * Set embedded content
                 * @member MapLocatorController
                 */
                setEmbeddedContent: function setEmbeddedContent() {

                    this.observer.publish(
                        this.eventmanager.eventList.getLocation
                    );
                },

                /**
                 * Set embedded content
                 * @member MapLocatorController
                 * @private
                 */
                _setEmbeddedContent: function _setEmbeddedContent() {
                    this.view.elements.$maplocator.renderEmbeddedContent({
                        latitude: this.model.getPrefs('maplocatorLatitude'),
                        longitude: this.model.getPrefs('maplocatorLongitude'),
                        zoom: this.model.getPrefs('maplocatorZoom'),
                        searchRadius: this.model.getPrefs('maplocatorSearchRadius'),
                        waterColor: this.model.getPrefs('maplocatorMapStyleWaterColor'),
                        waterVisibility: this.model.getPrefs('maplocatorMapStyleWaterVisibility'),
                        landscapeColor: this.model.getPrefs('maplocatorMapStyleLandscapeColor'),
                        roadSaturation: this.model.getPrefs('maplocatorMapStyleRoadSaturation'),
                        roadLightness: this.model.getPrefs('maplocatorMapStyleRoadLightness'),
                        roadHighwayVisibility: this.model.getPrefs('maplocatorMapStyleRoadHighwayVisibility'),
                        roadArterialElementType: this.model.getPrefs('maplocatorMapStyleRoadArterialElementType'),
                        roadArterialVisibility: this.model.getPrefs('maplocatorMapStyleRoadArterialVisibility'),
                        administrativeElementType: this.model.getPrefs('maplocatorMapStyleAdministrativeElementType'),
                        administrativeColor: this.model.getPrefs('maplocatorMapStyleAdministrativeColor'),
                        transitVisibility: this.model.getPrefs('maplocatorMapStyleTransitVisibility'),
                        poiVisibility: this.model.getPrefs('maplocatorMapStylePoiVisibility')
                    });
                },

                /**
                 * Add MapLocator rule
                 * @member MapLocatorController
                 * @param e
                 */
                addMapLocatorRule: function addMapLocatorRule(e) {

                    /**
                     * Define $button
                     * @type {*|jQuery|HTMLElement}
                     */
                    var $button = $(e.target),
                        scope = this.scope;

                    scope.observer.publish(
                        scope.eventmanager.eventList.publishRule,
                        [$button.attr('value'), scope.constructor.name]
                    );
                },

                /**
                 * Get location
                 * @member MapLocatorController
                 */
                getLocation: function getLocation() {
                    this.controller.getPosition(
                        function _setLocation(position) {
                            this.model.setMapLocatorLatitude(position.coords.latitude);
                            this.model.setMapLocatorLongitude(position.coords.longitude);
                            this._setEmbeddedContent.bind(this.scope)();
                        }
                    );
                },

                /**
                 * Calculate direction between two places
                 * @param destination
                 * @member MapLocatorController
                 */
                calculateRoute: function calculateRoute(destination) {

                    /**
                     * Define $maplocator
                     * @type {MapLocatorElement}
                     */
                    var $maplocator = this.scope.view.elements.$maplocator;

                    $maplocator.directionsService.route({

                        origin: $maplocator.pos,
                        destination: destination,
                        travelMode: google.maps.TravelMode.DRIVING

                    }, function directionsServiceCallback(response, status) {

                        if (status === google.maps.DirectionsStatus.OK) {
                            $maplocator.directionsDisplay.setDirections(response);
                        }
                    });
                }
            },

            BaseGeolocation.prototype,
            PluginController.prototype,
            WidgetContentController.prototype
        );
    }
);