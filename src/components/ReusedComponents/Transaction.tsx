import * as React from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./Transaction.css";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import axios from "axios";
import moment from "moment";

interface TransactionProps {
  onTransactionSave: ((transactionRow: any) => void) | null;
  id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Transaction: React.FC<TransactionProps> = ({ onTransactionSave, id }) => {
  const [value, setValue] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [accountIncome, setAccountIncome] = useState("");
  const [categoryIncome, setCategoryIncome] = useState("");
  const [transactionDataIncome, setTransactionDataIncome] = useState({
    amount: "",
    description: "",
    date: "",
    userId: id,
    categoryId: "",
    accountId: "",
  });

  const [accountExpense, setAccountExpense] = useState("");
  const [categoryExpense, setCategoryExpense] = useState("");
  const [transactionDataExpense, setTransactionDataExpense] = useState({
    amount: "",
    description: "",
    date: "",
    userId: id,
    categoryId: "",
    accountId: "",
  });

  const [accountNames, setAccountNames] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<
    { accountId: string; accountName: string }[]
  >([]);
  const [categories, setCategories] = useState<
    { categoryId: string; categoryName: string }[]
  >([]);

  const isValidListOfAccounts = () => {
    return accountNames;
  };

  const isValidListOfCategoryNames = () => {
    return categories;
  };

  const [activeTab, setActiveTab] = useState("income");

  const getAllAccounts = () => {
    const apiUrlAccounts = `https://fintrackbackend.onrender.com/accounts/${id}?userId=${id}`;

    if (isValidListOfAccounts()) {
      axios
        .get(apiUrlAccounts)
        .then((response) => {
          const { data } = response;

          if (Array.isArray(data) && data.length > 0) {
            const newAccountNames = data.map((account) => account.accountName);
            setAccountNames(newAccountNames);
            setAccounts(data);
          } else {
            console.error("Invalid data structure for categories:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching account names:", error);
        });
    }
  };

  const getAllCategories = () => {
    const transactionType = activeTab === "income" ? "income" : "expense";
    const apiUrlCategories = `https://fintrackbackend.onrender.com/categories/${id}/${transactionType}`;

    if (isValidListOfCategoryNames()) {
      axios
        .get(apiUrlCategories)
        .then((response) => {
          const { data } = response;

          if (Array.isArray(data) && data.length > 0) {
            const newCategoryNames = data.map(
              (category) => category.categoryName
            );
            setCategories(newCategoryNames);
            setCategories(data);
          } else {
            console.error("Invalid data structure for categories:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching category data:", error);
        });
    }
  };

  useEffect(() => {
    getAllAccounts();
    getAllCategories();
  }, [activeTab, id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    
    setValue(newValue);
    setActiveTab(newValue === 0 ? "income" : "expense");
  };

  const handleAccountChange = (event: SelectChangeEvent) => {
    const selectedAccountId: string = event.target.value;

    if (activeTab === "income") {
      setAccountIncome(selectedAccountId);
      setTransactionDataIncome((prevData) => ({
        ...prevData,
        accountId: selectedAccountId,
      }));
    } else if (activeTab === "expense") {
      setAccountExpense(selectedAccountId);
      setTransactionDataExpense((prevData) => ({
        ...prevData,
        accountId: selectedAccountId,
      }));
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const selectedCategoryId: string = event.target.value;

    if (activeTab === "income") {
      setCategoryIncome(selectedCategoryId);
      setTransactionDataIncome((prevData) => ({
        ...prevData,
        categoryId: selectedCategoryId,
      }));
    } else {
      setCategoryExpense(selectedCategoryId);
      setTransactionDataExpense((prevData) => ({
        ...prevData,
        categoryId: selectedCategoryId,
      }));
    }
  };

  const handleAmountChange = (field: string, value: string) => {
    const transactionData =
      activeTab === "income" ? transactionDataIncome : transactionDataExpense;
    const setTransactionData =
      activeTab === "income"
        ? setTransactionDataIncome
        : setTransactionDataExpense;

    setTransactionData({
      ...transactionData,
      [field]: value,
    });
  };

  const handleDescriptionChange = (field: string, value: string) => {
    const transactionData =
      activeTab === "income" ? transactionDataIncome : transactionDataExpense;
    const setTransactionData =
      activeTab === "income"
        ? setTransactionDataIncome
        : setTransactionDataExpense;

    setTransactionData({
      ...transactionData,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    const transactionData =
      activeTab === "income" ? transactionDataIncome : transactionDataExpense;
    transactionData.date = selectedDate
      ? moment( new Date(selectedDate)).format("YYYY-MM-DD")
      : "";

    const transactionRow = {
      amount:
        activeTab === "expense"
          ? -parseFloat(transactionData.amount)
          : parseFloat(transactionData.amount),
      description: transactionData.description,
      date: transactionData.date,
      userId: transactionData.userId,
      categoryId: transactionData.categoryId,
      accountId: transactionData.accountId,
    };

    const apiUrl = "https://fintrackbackend.onrender.com/transaction/save";

    Axios.post(apiUrl, transactionRow)
      .then((response) => {
        if (activeTab === "income") {
          setTransactionDataIncome({
            amount: "",
            description: "",
            date: "",
            userId: "",
            categoryId: "",
            accountId: "",
          });
        } else {
          setTransactionDataExpense({
            amount: "",
            description: "",
            date: "",
            userId: "",
            categoryId: "",
            accountId: "",
          });
        }

        const newRow = {
          ...response.data,
          categoryName: categories.find(
            (category) => category.categoryId === response.data.categoryId
          )?.categoryName,
        };

        if (onTransactionSave) {
          onTransactionSave(newRow);
        }
      })
      .catch((error) => {
        console.error("Error saving transaction:", error);
      });

    // setIsOpen(false);
  };

  const handleCancelClick = () => {
    setSelectedDate(null);
    // setIsOpen(false);

    if (activeTab === "income") {
      setTransactionDataIncome({
        amount: "0",
        description: "",
        date: "",
        userId: "",
        categoryId: "",
        accountId: "",
      });
    } else {
      setTransactionDataExpense({
        amount: "",
        description: "",
        date: "",
        userId: "",
        categoryId: "",
        accountId: "",
      });
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="nav-menu"
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Income" />
            <Tab label="Expense" />
          </Tabs>
        </Box>

        <form onSubmit={handleSaveClick}>
          {/* Date field */}
          <CustomTabPanel value={value} index={0}>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date picker"
                    onChange={(newDate: Date | null) => {
                      setSelectedDate(newDate);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {/* Account */}
            <FormControl
              sx={{ m: 1, minWidth: 160 }}
              size="medium"
              className="transaction-form"
            >
              <InputLabel id="account-label">Account</InputLabel>
              <Select
                labelId="account-label"
                value={activeTab === "income" ? accountIncome : accountExpense}
                onChange={handleAccountChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.accountId} value={account.accountId}>
                    {account.accountName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category */}
            <FormControl
              sx={{ m: 1, minWidth: 160 }}
              size="medium"
              className="transaction-form"
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={
                  activeTab === "income" ? categoryIncome : categoryExpense
                }
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Amount input */}
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              value={
                activeTab === "income"
                  ? transactionDataIncome.amount
                  : transactionDataExpense.amount
              }
              onChange={(e) => handleAmountChange("amount", e.target.value)}
            />

            {/* Description field */}
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={
                activeTab === "income"
                  ? transactionDataIncome.description
                  : transactionDataExpense.description
              }
              onChange={(e) =>
                handleDescriptionChange("description", e.target.value)
              }
            />
          </CustomTabPanel>

          {/* ***************** Expense **************** */}
          <CustomTabPanel value={value} index={1}>
            {/* Date field */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date picker"
                    onChange={(newDate: Date | null) => {
                      setSelectedDate(newDate);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {/* Account */}
            <FormControl
              sx={{ m: 1, minWidth: 160 }}
              size="medium"
              className="transaction-form"
            >
              <InputLabel id="account-label">Account</InputLabel>
              <Select
                labelId="account-label"
                key={activeTab === "income" ? accountIncome : accountExpense}
                value={activeTab === "income" ? accountIncome : accountExpense}
                onChange={handleAccountChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.accountId} value={account.accountId}>
                    {account.accountName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category Label */}
            <FormControl
              sx={{ m: 1, minWidth: 160 }}
              size="medium"
              className="transaction-form"
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={
                  activeTab === "income" ? categoryIncome : categoryExpense
                }
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Amount input */}
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              value={
                activeTab === "income"
                  ? transactionDataIncome.amount
                  : transactionDataExpense.amount
              }
              onChange={(e) => handleAmountChange("amount", e.target.value)}
            />

            {/* Note field */}
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={
                activeTab === "income"
                  ? transactionDataIncome.description
                  : transactionDataExpense.description
              }
              onChange={(e) =>
                handleDescriptionChange("description", e.target.value)
              }
            />
          </CustomTabPanel>

          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </form>
      </Box>
    </div>
  );
};

export default Transaction;
