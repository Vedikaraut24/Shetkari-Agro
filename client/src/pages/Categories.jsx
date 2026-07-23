import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CategoryForm from "../components/categories/CategoryForm";
import CategoryTable from "../components/categories/CategoryTable";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState("");

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        }
        catch (err) {

            console.log(err);

            toast.error("Failed to load categories");

        }

    };

    useEffect(() => {

        loadCategories();

    }, []);

    const handleSubmit = async (data) => {

        try {

            if (selectedCategory) {

                await updateCategory(
                    selectedCategory._id,
                    data
                );

                toast.success("Category Updated");

            }
            else {

                await createCategory(data);

                toast.success("Category Added");

            }

            setSelectedCategory(null);

            loadCategories();

        }
        catch (err) {

            console.log(err);

            toast.error("Operation Failed");

        }

    };

    const handleDelete = async (category) => {

        if (!window.confirm(`Delete ${category.name}?`))
            return;

        try {

            await deleteCategory(category._id);

            toast.success("Category Deleted");

            loadCategories();

        }
        catch (err) {

            toast.error("Delete Failed");

        }

    };

    const filteredCategories = categories.filter(category =>
        category.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold text-green-700">

                🏷 Categories

            </h1>

            <p className="text-gray-500 mb-6">

                Manage Product Categories

            </p>

            <div className="grid md:grid-cols-4 gap-5 mb-6">

                <div className="bg-white shadow rounded-2xl p-5">

                    <p>Total Categories</p>

                    <h2 className="text-3xl font-bold text-green-700">

                        {categories.length}

                    </h2>

                </div>

            </div>

            <div className="grid xl:grid-cols-3 gap-6">

                <CategoryForm

                    onSubmit={handleSubmit}

                    selectedCategory={selectedCategory}

                />

                <div className="xl:col-span-2">

                    <input

                        type="text"

                        placeholder="Search Category"

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        className="border w-full p-3 rounded-xl mb-4"

                    />

                    <CategoryTable

                        categories={filteredCategories}

                        onEdit={setSelectedCategory}

                        onDelete={handleDelete}

                    />

                </div>

            </div>

        </div>

    );

}