import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import axios from "axios";

interface AccountFormProps {
    onAccountSave: (accountRow: any) => void;
    id: string;
}

const AccountForm = (props: AccountFormProps) => {
    // const [accounts, setAccounts] = useState<{ accountId: string, accountName: string }[]>([]);
    // const [isOpen, setIsOpen] = useState(false);
    const [newAccount, setNewAccount] = useState(
        {
            accountName: '',
            amount: '',
            description: '',
            userId: ''
        }
    )

    const handleCancelClick = () => {
        // setIsOpen(false);
    }

    const handleAcountNameChange = (field: string, value: string): void => {
        setNewAccount({
            ...newAccount,
            [field]: value,
        });
    }

    const handleAmountChange = (field: string, value: string): void => {
        setNewAccount({
            ...newAccount,
            [field]: value,
        });
    }

    const handleDescriptionChange = (field: string, value: string): void => {
        setNewAccount({
            ...newAccount,
            [field]: value,
        });
    }

    const handleSaveClick = () => {
        const accountNameRow = {
            accountName: newAccount.accountName,
            amount: newAccount.amount,
            description: newAccount.description,
            userId: props.id
        };

        console.log("userId inside account form handleSave: ", props.id);

        const apiUrl = 'https://fintrackbackend.onrender.com/accounts/create';
        axios.post(apiUrl, accountNameRow)
            .then(response => {
                setNewAccount({
                    accountName: '',
                    amount: '',
                    description: '',
                    userId: ''
                });

                console.log('New Account :', newAccount);
                console.log('Response.data :', response.data);

                // const newAccountRow = {
                //     ...response.data,
                //     accountName: accounts.find(account => account.accountId === response.data.accountId)?.accountName
                // }

                // if (props.onAccountSave) {
                    // props.onAccountSave(newAccountRow);
                // }
            })
            .catch(error => {
                console.error('Error saving account:', error);
            });

        console.log("newAccountRow saved: ", newAccount);
    };


    return (
            <form action="" onSubmit={handleSaveClick}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="accountName"
                        label="accountName"
                        variant="outlined"
                        type="text"
                        defaultValue={newAccount.accountName}
                        onChange={(event) => handleAcountNameChange('accountName', event.target.value)} />
                    <TextField
                        id="amount"
                        label="amount"
                        variant="outlined"
                        type="text"
                        defaultValue={newAccount.amount}
                        onChange={(event) => handleAmountChange('amount', event.target.value)} />
                    <TextField
                        id="description"
                        label="description"
                        variant="outlined"
                        defaultValue={newAccount.description}
                        onChange={(event) => handleDescriptionChange('description', event.target.value)}
                    />
                </Box>
                <Button onClick={handleCancelClick}>Cancel</Button>
                <Button onClick={handleSaveClick} >Save</Button>
            </form>
    )
}

export default AccountForm