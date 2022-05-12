import { check_if_id_is_valid} from "../../services/genericServices";



describe("Order Services tests", () => {




    it('should return true', async () => {
        const result : any = await check_if_id_is_valid('1')  
        expect(result).toBeTrue;
      });

      it('should return false', async () => {
        const result : any = await check_if_id_is_valid('string')  
        expect(result).toBeFalse;
      });

  

  
  });