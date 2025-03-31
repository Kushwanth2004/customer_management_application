import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-hot-toast";
import usePageTitle from "../../hooks/usePageTitle";
import { CUSTOMERBACKENDURL } from "../../constants/constent";
import { FiSearch } from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { z } from "zod";

// Validation Schema using Zod
const userSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["user", "admin"], { message: "Invalid role" }),
  name: z.string().min(3, "Name must be at least 3 characters"),
  phonenumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const UserManagement = () => {
  usePageTitle("User Management");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "user",
    name: "",
    phonenumber: "",
    address: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${CUSTOMERBACKENDURL}/api/admin/users`, {
          withCredentials: true,
        });
        setUsers(JSON.parse(JSON.stringify(data.users)));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    try {
      userSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      const errors = {};
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
        toast.error(err.message);
      });
      setFormErrors(errors);
      return false;
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setSelectedUserId(user._id);
    setFormData({
      userName: user.userName,
      email: user.email,
      password: "",
      role: user.role,
      name: user.name,
      phonenumber: user.phonenumber,
      address: user.address,
    });
  };

  const handleUpdateUser = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${CUSTOMERBACKENDURL}/api/admin/users/${selectedUserId}`, formData, {
        withCredentials: true,
      });
      setUsers(users.map((u) => (u._id === selectedUserId ? { ...u, ...formData } : u)));
      setIsModalOpen(false);
      setIsEditing(false);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;
    try {
      const { data } = await axios.post(
        `${CUSTOMERBACKENDURL}/api/admin/users`,
        formData,
        { withCredentials: true }
      );
      setUsers([...users, data.user]);
      setFormData({ userName: "", email: "", password: "", role: "user", name: "", phonenumber: "", address: "" });
      setIsModalOpen(false);
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    }
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      {/* Edit Button */}
      <Button
        icon={<FiEdit className="" />}
        className="p-button-rounded p-button-warning shadow-md flex items-center justify-center"
        onClick={() => handleEditUser(rowData)}
      />

      {/* Delete Button */}
      <Button
        icon={<FiTrash2 className="text-red-500" />}
        className="p-button-rounded p-button-danger shadow-md flex items-center justify-center"
        onClick={() => handleDeleteUser(rowData._id)}
      />
    </div>
  );

  const statusBodyTemplate = (rowData) => (
    <span className={`px-3 py-1 rounded-full text-white ${rowData.active ? 'bg-green-500' : 'bg-red-500'}`}>{rowData.active ? "Active" : "Inactive"}</span>
  );

  const indexBodyTemplate = (rowData, props) => props.rowIndex + 1;

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phonenumber.includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm)
  );

  const header = (
    <>
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-md shadow-lg my-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="gap-2 p-button-success flex items-center"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="flex mb-4">
        <div className="relative w-1/3">
          <InputText
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </>
  );

  const handleDeleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId); // Debugging log

    if (!userId) {
      toast.error("Invalid user ID.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${CUSTOMERBACKENDURL}/api/admin/users/${userId}`, {
        withCredentials: true,
      });

      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };
  return (
    <div className="p-6 ">
      <div className="card shadow-lg p-4 rounded-lg bg-white">


        <DataTable
          value={filteredUsers}
          paginator
          rows={10}
          loading={loading}
          header={header}
          responsiveLayout="scroll"
        >
          <Column body={indexBodyTemplate} header="#" headerClassName="custom-header1" className="text-center" />
          <Column className="p-4" field="userName" header="Username" headerClassName="custom-header" />
          <Column field="email" header="Email" headerClassName="custom-header" />
          <Column field="role" header="Role" headerClassName="custom-header" />
          <Column field="phonenumber" header="Phone Number" headerClassName="custom-header" />
          <Column field="address" header="Address" headerClassName="custom-header" />
          <Column body={statusBodyTemplate} header="Status" headerClassName="custom-header" className="text-center" />
          <Column body={actionBodyTemplate} header="Edit" headerClassName="custom-header2" className="text-center" />
        </DataTable>
      </div>

      <Dialog
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        header={
          <div className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit User" : "Add User"}
          </div>
        }
        modal
        className="w-[40vw] p-6 shadow-2xl rounded-lg bg-white"
      >
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(formData)
            .filter((field) => field !== "role")
            .map((field, index) => (
              <div key={field} className="flex flex-col space-y-2">
                <label className="text-gray-600 font-medium capitalize">{field}</label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  type={field === "password" ? "password" : "text"}
                />
              </div>
            ))}

          {/* Role selection moved to last row */}
          <div className="col-span-2 flex flex-col space-y-2">
            <label className="text-gray-600 font-medium">Role</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">User</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Admin</span>
              </label>
            </div>
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            <Button
              label="Cancel"
              className="p-button-text p-3 text-gray-600 hover:text-red-500 transition"
              onClick={() => setIsModalOpen(false)}
            />
            <Button
              label={isEditing ? "Update User" : "Add User"}
              className="p-button-lg bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={isEditing ? handleUpdateUser : handleAddUser}
            />
          </div>
        </div>
      </Dialog>;

    </div>
  );
};

export default UserManagement;