import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Define a TypeScript type for a Student
interface Student {
  id: string;
  name: string;
  age: number;
  email?: string;
}

// Styled components for enhanced visual appeal
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
}));

const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  minHeight: '100vh',
  paddingTop: '2rem',
});

const App: React.FC = () => {
  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Omit<Student, "id"> & { id?: string }>({
    id: undefined,
    name: "",
    age: 0,
    email: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(null);

  // Local storage effects
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Form handling
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && formData.id) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === formData.id ? { ...student, ...formData } : student
        )
      );
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formData.name,
        age: formData.age,
        email: formData.email,
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    // Reset form
    setFormData({ id: undefined, name: "", age: 0, email: "" });
    setIsEditing(false);
  };

  const handleEdit = (id: string) => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setFormData(student);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setDeleteConfirmOpen(null);
  };

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Form Column */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <PersonAddIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Student Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email (Optional)"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={isEditing ? <EditIcon /> : <PersonAddIcon />}
                      >
                        {isEditing ? "Update Student" : "Add Student"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Students List Column */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom color="white">
              Registered Students
            </Typography>
            <Grid container spacing={3}>
              {students.map((student) => (
                <Grid item xs={12} sm={6} md={4} key={student.id}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6">{student.name}</Typography>
                      <Typography color="textSecondary">
                        Age: {student.age}
                      </Typography>
                      {student.email && (
                        <Typography variant="body2" color="textSecondary">
                          Email: {student.email}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(student.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteConfirmOpen(student.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen !== null}
          onClose={() => setDeleteConfirmOpen(null)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this student?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(null)}>Cancel</Button>
            <Button
              color="secondary"
              onClick={() => deleteConfirmOpen && handleDelete(deleteConfirmOpen)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </GradientBackground>
  );
};

export default App;