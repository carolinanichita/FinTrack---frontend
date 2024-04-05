import Header from '../ReusedComponents/Header'
import './Settings.css'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import AccountForm from '../ReusedComponents/AccountForm';
import CategoryForm from '../ReusedComponents/CategoryForm';

interface SettingsProps {
    userId: string;
}

export interface AccountRow {
    accountRowName: string;
}

// interface AccountTableDay {
//     accountRows: AccountRow[];
// }

export interface CategoryExpenseRow {
    categoryExpenseRows: string;
}

export interface CategoryIncomeRow {
    categoryId: string;
    categoryName: string;
}

interface CategoryExpenseTableDay {
    categoryExpenseRows: CategoryExpenseRow[];
}

const Settings = (props: SettingsProps) => {
    const [categoryExpenseTableDays, setCategoryExpenseTableDays] = useState<CategoryExpenseTableDay[]>([]);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [accounts, setAccounts] = useState<{ accountId: string, accountName: string }[]>([]);
    const [categories, setCategories] = useState<{ categoryId: string, categoryName: string }[]>([]);
    const [allCategories, setAllCategories] = useState<{ categoryId: string, categoryName: string, transactionType: string }[]>([]);
    const [isOpenNewAccount, setIsOpenNewAccount] = useState(false);
    const [isOpenNewCategoryIncome, setIsOpenNewCategoryIncome] = useState(false);
    const [isOpenNewCategoryExpense, setIsOpenNewCategoryExpense] = useState(false);

    const handleClickNewAccountCategoryOpen = () => {
        setIsOpenNewAccount(true);
    }

    const handleNewAccountCategoryClose = () => {
        setIsOpenNewAccount(false);
    }

    const handleNewCategoryIncomeClose = () => {
        setIsOpenNewAccount(false);
    }

    const isValidListOfAccounts = () => {
        return accounts;
    }

    const isValidListOfCategoryIncomeNames = () => {
        return categories;
    }

    const handleClickNewCategoryExpense = () => {
        setIsOpenNewCategoryExpense(true);
    }

    const handleCloseNewCategoryExpense = () => {
        setIsOpenNewCategoryExpense(false);
    }

    const handleClickNewCategoryIncome = () => {
        setIsOpenNewCategoryIncome(true);
    }

    const handleCategoryIncomeClose = () => {
        setIsOpenNewCategoryIncome(false);
    }


    const getAllAccounts = () => {
        const apiUrlAccounts = `https://fintrackbackend.onrender.com/accounts/${props.userId}?userId=${props.userId}`;

        if (isValidListOfAccounts()) {
            axios.get(apiUrlAccounts)
                .then(response => {
                    const { data } = response;

                    if (Array.isArray(data) && data.length > 0) {
                        const newAccountNames = data.map(account => account.accountName);
                        setAccounts(newAccountNames);
                        setAccounts(data);
                    } else {
                        console.error('Invalid data structure for categories:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching account names:', error);
                });
        }
    }

    const getAllCategories = () => {
        const apiUrlCategories = `https://fintrackbackend.onrender.com/categories/${props.userId}`;

        if (isValidListOfCategoryIncomeNames()) {
            axios.get(apiUrlCategories)
                .then(response => {
                    const { data } = response;

                    if (Array.isArray(data) && data.length > 0) {
                        const newCategoryNames = data.map(category => category.categoryName);
                        setCategories(newCategoryNames);
                        setAllCategories(data);
                    } else {
                        console.error('Invalid data structure for categories:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching category data:', error);
                });
        }
    }

    useEffect(() => {
        getAllAccounts();
        getAllCategories();
    }, [props.userId]);

    const addNewAccountToTheList = (newAccountRow: AccountRow) => {
        console.log(newAccountRow);
        
        getAllAccounts();
        handleNewAccountCategoryClose();
    };

    const addNewCategoryExpenseToTheList = (newCategoryExpenseRow: CategoryExpenseRow) => {
        console.log("newCategoryRow inside addNewCategoryExpenseToTheList", newCategoryExpenseRow);
        setCategoryExpenseTableDays([...categoryExpenseTableDays, { categoryExpenseRows: [newCategoryExpenseRow] }]);
        getAllCategories();
        handleCloseNewCategoryExpense();
    }

    const addNewCategoryIncomeToTheList = (newCategoryIncomeRow: CategoryIncomeRow) => {
        console.log("newCategoryRow inside addNewCategoryIncomeToTheList", newCategoryIncomeRow);
        getAllCategories();
        handleCategoryIncomeClose();
    }

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            console.log(event);
            
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Header />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Incomes category settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {allCategories
                            .filter(category => category.transactionType === 'income')
                            .map((category) => {
                                return (
                                    <MenuItem key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </MenuItem>
                                );
                            })}
                    </Typography>
                    <Typography className="plus-btn">
                        <Button variant="outlined" onClick={handleClickNewCategoryIncome}>Add new category income
                        </Button>
                        <Dialog open={isOpenNewCategoryIncome} onClose={handleNewCategoryIncomeClose} component={"div"}>
                            <DialogTitle>Create new category income</DialogTitle>
                            <DialogContent>
                                <CategoryForm
                                    onSave={(newCategoryRow: any) => { addNewCategoryIncomeToTheList(newCategoryRow) }} 
                                    onCancel={() => setIsOpenNewCategoryIncome(false)}
                                    userId={props.userId}
                                    transactionType="income"
                                />
                            </DialogContent>
                        </Dialog>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Expenses category settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {allCategories
                            .filter(category => category.transactionType === 'expense')
                            .map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                    </Typography>
                    <Typography className="plus-btn">
                        <Button variant="outlined" onClick={handleClickNewCategoryExpense}>Add new category expense
                        </Button>
                        <Dialog open={isOpenNewCategoryExpense} onClose={handleCloseNewCategoryExpense}>
                            <DialogTitle>Create new category expense</DialogTitle>
                            <DialogContent>
                                <CategoryForm
                                    onSave={(newTransactionRow: any) => { addNewCategoryExpenseToTheList(newTransactionRow); }}
                                    onCancel={() => setIsOpenNewCategoryExpense(false)}
                                    userId={props.userId}
                                    transactionType="expense"
                                />
                            </DialogContent>
                        </Dialog>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Accounts settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {accounts.map((account) => (
                            <MenuItem key={account.accountId} value={account.accountId}>
                                {account.accountName}
                            </MenuItem>
                        ))}
                    </Typography>
                    <Typography className="plus-btn">
                        <Button variant="outlined" onClick={handleClickNewAccountCategoryOpen}>Add new account
                        </Button>
                        <Dialog open={isOpenNewAccount} onClose={handleNewAccountCategoryClose}>
                            <DialogTitle>Create new account</DialogTitle>
                            <DialogContent>
                                <AccountForm onAccountSave={(newRow: any) => { addNewAccountToTheList(newRow) }} id={props.userId} />
                            </DialogContent>
                        </Dialog>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >

                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Budget settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Not implememntd yet!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Settings