// @ts-ignore
import { instance } from "../index"
import type { Login, Register } from '@/shared/types/userTypes';

export default {

    login(params: Login) {
        return instance.post(`/login`, params);
    },

    register(params: Register) {
        return instance.post(`/register`, params);
    },

    logout() {
        return instance.delete(`/logout`);
    }

}