"use client";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useState, useEffect } from "react";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  X,
  Loader2,
  User,
  Shield,
  Lock,
  Mail,
  Variable,
} from "lucide-react";
// import { useMutation, useQuery } from "@apollo/client";
// import { GET_USERS } from "@/app/graphql-api/page";
import { FaUserEdit, FaRegEye } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "@/app/graphql-api/page";
import React from "react";
import { toast } from "react-toastify";
type CreateUserProps = {
  name: string;
  email: string;
  role: string;
  password: string;
};

// Define TypeScript interface for better type safety

export default function UserManagementPage() {
  const router = useRouter();
  // const [IsOpenTrash,setIsOpenTrash] = React.useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [currentUser, setCurrentUser] = useState<any>(User);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser, setdeleteUser] = useMutation(DELETE_USER);
  const [updateUser, setupdateUser] = useMutation(UPDATE_USER);
  const [submitData, setSubmitData] = React.useState<CreateUserProps>({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await createUser({
        variables: {
          input: {
            name: submitData.name,
            email: submitData.email,
            role: submitData.role,
            password: submitData.password,
          },
        },
      });
      if (res.data.createUser.id) {
        toast.success("User created success! ✅");
      } else {
        toast.error("User not created! ❌");
      }
      refetch();
    } catch (err) {
      toast.error("Something went wrong. Try again! ❌");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Update existing user
  const handleUpdateUser =  async() => {
    setIsLoading(true);
    try {
      
      const res = await updateUser({
        variables: {
          updateUserId: currentUser.id,
          input: {
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
          },
        },
      });
      if(res.data.updaateUser.id) {
        toast.success("User updated successfully! ✅");
      } else {
        toast.error("User not updated! ❌");
      }
      refetch();
    } catch (err) {
      toast.error("Failed to update user! ❌");
    }finally {
      setIsLoading(false);
      setIsEditModalOpen(false);
    }
    

  };

  // // Delete user
  const handleDeleteUser = async() => {
    try {
            const res = await deleteUser({ variables: { deleteUserId: selectedId } });
      if (res.data.deleteUser) {
        toast.success("User deleted successfully! ✅");
      } else {
        toast.error("User not deleted! ❌");
      }
    } catch (err) {
      toast.error("Failed to delete user! ❌");
    } finally {
      setIsDeleteModalOpen(false);
      refetch();
    }
    

  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search and Add User controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {data.getUsers.users.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 align-middle text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 align-middle text-gray-700 dark:text-gray-300">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 align-middle flex  text-gray-700 dark:text-gray-300">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center justify-center gap-3 h-full">
                      <FaUserEdit
                        className="cursor-pointer hover:text-blue-500 text-lg"
                        onClick={() => {
                          setCurrentUser(user);
                          setIsEditModalOpen(true);
                        }}
                      />
                      <IoTrashOutline
                        className="cursor-pointer hover:text-red-500 text-lg"
                        onClick={() => {
                          setSelectedId(user.id);
                          setCurrentUser(user);
                           setIsDeleteModalOpen(true);
                        }}
                      />
                      <FaRegEye
                        onClick={() =>
                          router.push(`/dashboard/user/${user.id}`)
                        }
                        className="cursor-pointer hover:text-yellow-500 text-lg"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isOpen && (
        <form
          onSubmit={handleAddUser}
          className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
        >
          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md transform transition-all duration-300 animate-in">
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl" />

              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Add New User
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Create a new account
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSubmitData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={submitData.email}
                    onChange={(e) =>
                      setSubmitData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                    <Lock className="h-4 w-4 text-purple-500" />
                    Password
                  </label>
                  <div className="relative z-0 w-full group">
                    <input
                      value={submitData.password}
                      onChange={(e) =>
                        setSubmitData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                      type="password"
                      name="repeat_password"
                      id="floating_repeat_password"
                      placeholder="Create secure password"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    Role
                  </label>
                  <div className="relative z-0 w-full group">
                    <input
                      value={submitData.role}
                      onChange={(e) =>
                        setSubmitData((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white group-hover:border-gray-300"
                      type="text"
                      name="floating_role"
                      id="floating_role"
                      placeholder="Enter user role"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <User className="h-4 w-4" />
                        Add User
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Decorative blur elements */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-xl -z-10" />
            </div>
          </div>
        </form>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit User</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={currentUser.role}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
       {isDeleteModalOpen && selectedId && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Delete User</h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              <span className="font-medium">{currentUser?.name}</span>? This
              {/* <span className="font-medium">{selectedId.name}</span>? This */}
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}
