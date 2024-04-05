import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

interface CategoryFormProps {
  onSave: (newCategoryRow: any) => void;
  onCancel: () => void;
  userId: string;
  transactionType: "income" | "expense";
}

const CategoryForm = (props: CategoryFormProps) => {
    // const [categories, setCategories] = useState<{ categoryId: string, categoryName: string, transactionType: string }[]>([]);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    transactionType: props.transactionType,
    userId: props.userId,
  });

  const handleCategoryNameChange = (
    field: string,
    value: string
  ): void => {
    setNewCategory({
      ...newCategory,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    console.log("save inside handleSaveClick");
    
    const categoryNameRow = {
      categoryName: newCategory.categoryName,
      transactionType: newCategory.transactionType,
      userId: props.userId,
    };

    const apiUrl = 'http://localhost:8080/categories/create';
    axios.post(apiUrl, categoryNameRow)
      .then(response => {
        setNewCategory({
          categoryName: '',
          transactionType: props.transactionType,
          userId: ''
        });

        console.log("response.data inside handleSaveClick in CategoryForm", response.data);

        const newCategoryRow = {
          ...response.data,
        //   categoryName: response.data.categoryName,
        // categoryName: categories.find(category => category.categoryId === response.data.categoryId)?.categoryName
        };

        console.log("newCategoryRow inside handleSaveClick in CategoryForm", newCategoryRow);
        

        if (props.onSave) {
          props.onSave(newCategoryRow);
        }
      })
      .catch(error => {
        console.error('Error saving category:', error);
      });
  };

  const handleCancelClick = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <form onSubmit={handleSaveClick}>
      <TextField
        id="categoryName"
        label="Category Name"
        variant="outlined"
        type="text"
        value={newCategory.categoryName}
        onChange={(event) => handleCategoryNameChange("categoryName", event.target.value)}
      />
      <div>
        <Button type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
