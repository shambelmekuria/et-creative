import React from 'react'
import FormWrapper from './formWrapper'

export default function AccountForm() {
    return (
        <FormWrapper title='Account Creation'>
            <label>Email</label><br />
            <input type="email" name="email" /><br /><br />
            <label>Password</label><br />
            <input type="password" name="password" /><br /><br />
        </FormWrapper>
    )
}
