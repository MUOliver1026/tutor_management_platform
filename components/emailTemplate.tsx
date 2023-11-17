import { FC } from "react";

const EmailTemplate:FC<{ verifyCode:string }>= ({ verifyCode }) => (
    <div>
        <h1>Enter the code below to verify your identity</h1>
        <code>{verifyCode}</code>
    </div>
);

export default EmailTemplate
