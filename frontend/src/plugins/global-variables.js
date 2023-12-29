

import Vue from "vue";

export default (app) => {
    app.prototype.$appName = process.env.VUE_APP_NAME
}


