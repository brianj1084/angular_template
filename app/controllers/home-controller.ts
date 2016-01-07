/// <reference path="../_references.ts" />

namespace app.controllers {
    'use strict';
    
    export class HomeController {
        greeting: string;
        
        constructor($log: ng.ILogService) {
            var ctrl = this;
            
            ctrl.greeting = "Hello, Angular!";
            $log.debug("HomeController constructor called.");
        }
    }
}