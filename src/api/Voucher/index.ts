import { instance } from "../index"

export default {

    createVoucher(params: any) {
        return instance.post(`/vouchers`, params);
    },

    updateVoucher(params: any, id: number) {
        return instance.patch(`/vouchers/${id}`, params);
    },

    getVoucherByUserId(params: any, id: number)
    {
        return instance.get(`/vouchers/${id}`, { params });
    },

    deleteVoucher(id: number)
    {
        return instance.delete(`/vouchers/${id}`);
    }

}