import FormWrapper from "./formWrapper";
type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};
type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

function AddressForm({ street, city, state, zip,updateFields }: AddressFormProps) {
  return (
    <>
      <FormWrapper title="Address Form">
        <label>Street</label>
        <br />
        <input type="text" name="street" 
        value={street}
        onChange={(e) => updateFields({ street: e.target.value })}
        />
        <br />
        <br />

        <label>City</label>
        <br />
        <input type="text" name="city"  value={city}
        onChange={(e) => updateFields({ city: e.target.value })}/>
        <br />
        <br />

        <label>State</label>
        <br />
        <input type="text" name="state"  value={state}
        onChange={(e) => updateFields({ state: e.target.value })}/>
        <br />
        <br />

        <label>Zip Code</label>
        <br />
        <input type="text" name="zip" 
        value={zip}
        onChange={(e) => updateFields({ zip: e.target.value })}/>
        <br />
        <br />
      </FormWrapper>
    </>
  );
}

export default AddressForm;
