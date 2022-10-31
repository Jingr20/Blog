// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportAdminHome = require('../../../app/controller/admin/home');
import ExportDefaultHome = require('../../../app/controller/default/home');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      home: ExportAdminHome;
    }
    default: {
      home: ExportDefaultHome;
    }
  }
}
