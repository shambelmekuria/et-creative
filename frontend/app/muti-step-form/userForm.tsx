import FormWrapper from "./formWrapper";
type UserData = {
  firstName: string;
  lastName: string;
};
type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};
function UserForm({ firstName, lastName, updateFields }: UserFormProps) {
  return (
    <FormWrapper title="Personal Information">
      <label>First Name</label>
      <br />
      <input
        autoFocus
        required
        type="text"
        name="firstName"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <br />
      <br />

      <label>Last Name</label>
      <br />
      <input
        required
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <br />
      <br />
    </FormWrapper>
  );
}

export default UserForm;
