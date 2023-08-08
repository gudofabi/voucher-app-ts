import { defineStore } from "pinia";
import repository from '@/api/Voucher/index'

export const useVoucherStore = defineStore({
    id: 'useVoucherStore',

    state: () => ({
        vouchers: [] as any,

        loading: false as boolean,

        // pagination
        paginationNo: null as any,
        currentPage: null as number | null,
        lastPage: null as number | null,
        totalPages: null as number | null,
        meta: null as any | null, 
        links: null as any | null
    }),

    getters: {
        getVouchers: (state) => state.vouchers,
        getLinks: state => {
            let newLinks: any = [];
            if(state.meta){
                (state.meta.links as any ).forEach((link: unknown) => {
                    const $link: any = link 
                    if($link.label != 'Next &raquo;' && $link.label != '&laquo; Previous') {
                        newLinks.push($link);
                    }
                })
            }
            return newLinks;
        },
        getPaginationNo: state => {
            const number = (state.paginationNo - Math.floor(state.paginationNo) != 0);

            if(number) {
                return parseInt(state.paginationNo) + 1;
            } else {
                return state.paginationNo;
            }
        }
    },

    actions: {
        async getVoucherByUserId(params: any, id: number) {
            this.loading = true;
            await repository.getVoucherByUserId(params, id)
                .then(response => {
                    this.loading = false;
                    this.vouchers = response.data.result.data
                    this.links = response.data.result.links
                    this.currentPage = response.data.result.current_page;
                    this.lastPage = response.data.result.last_page;
                    this.meta =  response.data.result;
                    this.paginationNo = response.data.result.total/response.data.result.per_page;
                })
                .catch(err => {
                    this.loading = false;
                })
        },

        async updateVoucher(voucher_id: number) {
            const params = { 
                word: this.getRandomWord(),
            }

            const response = await repository.updateVoucher(params, voucher_id)

            return response;
        },

        async createVoucher() {
            const params = { 
                word: this.getRandomWord(), 
                user_id: JSON.parse(sessionStorage.user)?.id 
            }
            const response = await repository.createVoucher(params)

            return response;
        },

        async deleteVoucher(id: number)
        {
            const response = await repository.deleteVoucher(id)
            return response;
        },

        getRandomWord() {
            // Array of words
            var words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'grape', 'honey', 'ice cream', 'juice', 'kiwi', 'lemon', 'mango', 'nut', 'orange', 'pineapple', 'quince', 'raspberry', 'strawberry', 'tomato', 'umbrella', 'vanilla', 'watermelon', 'xerox', 'yogurt', 'zebra'];
        
            // Get a random index
            var randomIndex = Math.floor(Math.random() * words.length);
        
            // Return the word at the random index
            return words[randomIndex];
        }
    }
})