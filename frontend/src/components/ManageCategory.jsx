import React, { useState, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { CategoryItem, Modal } from "../components";
import { CategoriesContext } from "../container/Home";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../service/categories";

const messageHeader = "Delete Category";
const messageBody =
  "Are you sure you want to delete this category? All of data will be permanently removed. This action cannot be undone.";

function ManageCategory({ user, categories }) {
  const categoriesContext = useContext(CategoriesContext);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [currentCategoryEdit, setCurrentCategoryEdit] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const onSubmit = async (value) => {
    try {
      if (currentCategoryEdit) {
        await updateCategory(value, currentCategoryEdit.id);
      } else {
        await createCategory(value);
      }
      await categoriesContext.fetchCategories()
      resetState();
    } catch (error) {
      resetState();
      alert('some thing went wrong')
    }
  };
  
  const onDeleteCategory = async () => {
    try {
      await deleteCategory(currentCategoryEdit.id);
      await categoriesContext.fetchCategories()
      closeDeleteCategory();
    } catch (error) {
      closeDeleteCategory();
      alert('some thing went wrong')
    }
  };

  const onEditCategory = async (category) => {
    setCurrentCategoryEdit(category);
    setShowCategoryPopup(true);
  };

  const resetState = () => {
    setCurrentCategoryEdit();
    setShowCategoryPopup(false);
  };

  const openDeleteCategory = async (category) => {
    setCurrentCategoryEdit(category);
    setShowDeletePopup(true);
  };

  const closeDeleteCategory = async () => {
    setCurrentCategoryEdit();
    setShowDeletePopup(false);
  };

  return (
    <div className="">
      <button
        onClick={() => setShowCategoryPopup(true)}
        type="button"
        className="flex items-center  py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <IoMdAdd />
        <span className="pl-2">Create new Category</span>
      </button>
      <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={category.id}
                >
                  <td className="px-6 py-4">
                    <img
                      src={category.image_link}
                      className="w-12 h-12 rounded-full  shadow-sm"
                    />
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap capitalize"
                  >
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-5 "
                        onClick={() => onEditCategory(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                        onClick={() => openDeleteCategory(category)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showCategoryPopup && (
        <CategoryItem
          onRejectBtn={resetState}
          onAcceptBtn={onSubmit}
          categoryEdit={currentCategoryEdit}
        />
      )}

      {showDeletePopup && (
        <Modal
          onRejectBtn={closeDeleteCategory}
          onAcceptBtn={onDeleteCategory}
          messageHeader={messageHeader}
          messageBody={messageBody}
        />
      )}  
    </div>
  );
}

export default ManageCategory;
