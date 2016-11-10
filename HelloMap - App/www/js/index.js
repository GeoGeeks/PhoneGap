/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
        // Mapa exterior
        var map;
        var urlCosmos100 = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/Puntos_Interes_CCU2016/MapServer/0";
        var urlParqueaderos = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/Puntos_Interes_CCU2016/MapServer/1";
        var urlRestaurantes = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/Puntos_Interes_CCU2016/MapServer/2";
        var urlHoteles = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/Puntos_Interes_CCU2016/MapServer/3";

        // Mapa Interior
        var mapInterior;
        var UrlPisoUnoPlano = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/PlanosCosmos/MapServer/1";
        var UrlPisoUnoBase = "http://54.187.22.10:6080/arcgis/rest/services/CCU2016/PlanosCosmos/MapServer/2";

        require([
            "esri/map", 
            "esri/layers/FeatureLayer",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/InfoTemplate",
            "dojo/domReady!"
        ], function(
            Map,
            FeatureLayer,
            ArcGISDynamicMapServiceLayer,
            ArcGISTiledMapServiceLayer,
            InfoTemplate
        ) {
            // var infoWindow = new  InfoWindow({
            //     domNode: domConstruct.create("div", null, dom.byId("mapDiv"))
            // });

            // var popup = new Popup({
            //     fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            //     new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            //     new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
            // }, domConstruct.create("div"));


            map = new Map("map", {
                basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
                center: [-74.05460907017716, 4.68670403797122], // longitude, latitude
                zoom: 16
                // infoWindow: infoWindow
            });

            map.on('load', function(){
                Cosmos100Layer = new FeatureLayer(urlCosmos100,{
                    "mode": FeatureLayer.ONDEMAND,
                    "outFields": ["*"]
                });
                map.addLayer(Cosmos100Layer);

                var templateParqueaderos = new InfoTemplate();
                templateParqueaderos.setTitle("<b>${Descripcio}</b>");
                templateParqueaderos.setContent("${POI_NAME}");

                ParqueaderosLayer = new FeatureLayer(urlParqueaderos,{
                    "mode": FeatureLayer.ONDEMAND,
                    "infoTemplate": templateParqueaderos,
                    "outFields": ["*"]
                });
                map.addLayer(ParqueaderosLayer);

                var templateRestaurantes = new InfoTemplate();
                templateRestaurantes.setTitle("<b>${Descripcio}</b>");
                templateRestaurantes.setContent("${POI_NAME}");

                RestaurantesLayer = new FeatureLayer(urlRestaurantes,{
                    "mode": FeatureLayer.ONDEMAND,
                    "infoTemplate": templateRestaurantes,
                    "outFields": ["*"]
                });
                map.addLayer(RestaurantesLayer);

                var templateHoteles = new InfoTemplate();
                templateHoteles.setTitle("<b>${Descripcio}</b>");
                templateHoteles.setContent("${POI_NAME}");

                HotelesLayer = new FeatureLayer(urlHoteles,{
                    "mode": FeatureLayer.ONDEMAND,
                    "infoTemplate": templateHoteles,
                    "outFields": ["*"]
                });
                map.addLayer(HotelesLayer);
            });

            // Mapa Interior
            mapInterior = new Map("mapInterior", {
                basemap: "topo",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
                center: [-74.0550591141191, 4.68566101392064], // longitude, latitude
                zoom: 19
            });

            mapInterior.on('load', function(){
                pisoUnoBase = new FeatureLayer(UrlPisoUnoBase,{
                    "mode": FeatureLayer.ONDEMAND,
                    "outFields": ["*"]
                });
                mapInterior.addLayer(pisoUnoBase);

                pisoUnoPlano = new FeatureLayer(UrlPisoUnoPlano,{
                    "mode": FeatureLayer.ONDEMAND,
                    "outFields": ["*"]
                });
                mapInterior.addLayer(pisoUnoPlano);
            });
        });
    }
};

function cambairMapaExterno(){
    $('#mapInterior').hide();
    $('#map').show();
}

function cambairMapaInterno(){
    $('#mapInterior').show();
    $('#map').hide();
}