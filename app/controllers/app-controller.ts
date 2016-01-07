/// <reference path="../_references.ts" />

namespace app.controllers {
    'use strict';
    
    export class AppController {
        constructor($log: ng.ILogService) {
            $log.debug('AppController constructor called.');
        }
    }
}