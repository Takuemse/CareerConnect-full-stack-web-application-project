import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "FULL_TIME",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/jobs", {
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
      });

      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-12">
      <form onSubmit={submit} className="mx-auto max-w-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-4xl text-[#14213D]">Post a role</h1>

        {error && <p className="mt-5 bg-red-50 p-3 text-red-700">{error}</p>}

        <div className="mt-6 space-y-4">
          <input className="w-full border p-3" name="title" placeholder="Job title" onChange={update} required />
          <textarea className="w-full border p-3" name="description" placeholder="Description" rows="6" onChange={update} required />
          <textarea className="w-full border p-3" name="requirements" placeholder="Requirements" rows="4" onChange={update} />
          <input className="w-full border p-3" name="location" placeholder="Location" onChange={update} required />

          <div className="grid gap-4 md:grid-cols-2">
            <input className="border p-3" name="salaryMin" type="number" placeholder="Minimum salary" onChange={update} required />
            <input className="border p-3" name="salaryMax" type="number" placeholder="Maximum salary" onChange={update} required />
          </div>

          <select className="w-full border p-3" name="jobType" value={form.jobType} onChange={update}>
            <option value="FULL_TIME">Full time</option>
            <option value="PART_TIME">Part time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>

          <button disabled={loading} className="bg-[#C4622D] px-6 py-3 text-white disabled:opacity-50">
            {loading ? "Posting..." : "Post job"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateJob;