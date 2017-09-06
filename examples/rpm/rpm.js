"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const graphite = require("graphite");
const client = graphite.createClient('plaintext://your-graphite-url:2003');
class Test {
    rpmExample() {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            let foo = i + Math.random();
        }
        console.log('ended method');
        return true;
    }
}
__decorate([
    index_1.RPM('key', client)
], Test.prototype, "rpmExample", null);
const test = new Test();
test.rpmExample();
test.rpmExample();
test.rpmExample();
test.rpmExample();
setTimeout(() => {
    test.rpmExample();
    test.rpmExample();
}, 60000);
//# sourceMappingURL=rpm.js.map