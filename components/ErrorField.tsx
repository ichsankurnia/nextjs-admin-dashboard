import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

type Props = {
    errors: FieldErrors,
    name: any
};

function ErrorField({ errors, name }: Props) {
    return <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => {
            return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p key={type} className='text-red-500 text-xs mt-1 font-medium italic font-poppins'>⚠ {message}</p>
                ))
                : null;
        }}
    />
}

export default ErrorField;
