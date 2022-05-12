import { check_if_product_exist} from "../../services/productServices";



describe("Order Services tests", () => {




    it('should return true', async () => {
        const result : any = await check_if_product_exist('1')  
        expect(result).toBeTrue;
      });

      it('should return false', async () => {
        const result : any = await check_if_product_exist('10')  
        expect(result).toBeFalse;
      });

  

  
  });