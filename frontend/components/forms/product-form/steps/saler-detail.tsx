import { useFormContext } from "react-hook-form";
import FormWrapper from "../formWrapper";


function SalerDetail() {
  const {register} = useFormContext()
  return (
    <>
      <FormWrapper title="Address Form">
        <label>Street</label>
        <br />
        <input type="text" {...register('street')}/>
        <br />
        <br />

        <label>City</label>
        <br />
        <input type="text" {...register('city')}  />
        <br />
        <br />

        <label>State</label>
        <br />
        <input type="text" {...register('state')}/>
        <br />
        <br />

        <label>Zip Code</label>
        <br />
        <input type="text" {...register('zip')}/>
        <br />
        <br />
      </FormWrapper>
    </>
  );
}

export default SalerDetail;
