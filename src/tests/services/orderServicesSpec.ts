import { get_order_creator, check_if_product_and_order_exist} from "../../services/orderServices";



describe("Order Services tests", () => {


    it('should return id of order creator', async () => {
      const result : any = await get_order_creator('1')  
      expect(result).toEqual('1');
    });

    it('should return true', async () => {
        const result : any = await check_if_product_and_order_exist('1', '1')  
        expect(result).toBeTrue;
      });

      it('should return false', async () => {
        const result : any = await check_if_product_and_order_exist('1', '2')  
        expect(result).toBeFalse;
      });

  

  
  });