import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            isRemember: false,
            warn: {},
        }
    },
    mutations: {
        mIsRemember(state, payload) {
            state.isRemember = !state.isRemember
        },
        mWardId(state, payload) {
            state.warn = payload
            console.log(this.state.warn)
        }
    },
    actions: {
        aIsRemenber(store, payload) {
            store.commit("mIsRemember", payload)
        },
        aWardId(store, payload) {
            store.commit("mWardId", payload)
        }
    },
    getters: {},
    modules: {}
})
