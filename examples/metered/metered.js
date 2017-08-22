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
const client = graphite.createClient('plaintext://graphite-test.qiwi.com:2003');
class Test {
    meteredExample() {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            let foo = i + Math.random();
        }
        console.log('ended method');
        return true;
    }
    meteredPromiseExample() {
        console.log('started promise method');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('ended promise method');
                resolve(true);
            }, 1000);
        });
    }
}
__decorate([
    index_1.Metered('features.test.key', client)
], Test.prototype, "meteredExample", null);
__decorate([
    index_1.Metered('some.test.key', client)
], Test.prototype, "meteredPromiseExample", null);
const test = new Test();
test.meteredExample();
test.meteredPromiseExample();
//# sourceMappingURL=metered.js.map