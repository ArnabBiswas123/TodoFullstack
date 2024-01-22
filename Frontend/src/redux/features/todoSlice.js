import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("https://todobackend-bici.onrender.com/api/v1/todo/alltodo");
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTodos = createAsyncThunk(
  "todos/addTodos",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://todobackend-bici.onrender.com/api/v1/todo/addtodo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: todo,
            iscompleted: false,
          }),
        }
      );
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://todobackend-bici.onrender.com/api/v1/todo/deletetodo/${id}`,
        { method: "DELETE" }
      );

      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const completeTodos = createAsyncThunk(
  "todos/completeTodos",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://todobackend-bici.onrender.com/api/v1/todo/completetodo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            iscompleted: completed,
          }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editTodos = createAsyncThunk(
  "todos/editTodos",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://todobackend-bici.onrender.com/api/v1/todo/edittodo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: name,
          }),
        }
      );
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    loading: false, // or 'loading', 'succeeded', 'failed'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = JSON.parse(JSON.stringify(state.data));

        if (action.payload.success === true) {
          state.data.push(action.payload.data);
        } else {
          state.error = action.payload.msg;
        }
      })
      .addCase(addTodos.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.data._id;

        let newdata = JSON.parse(JSON.stringify(state.data));
        if (action.payload.success === true) {
          newdata = newdata.filter((ele) => ele._id != id);
          state.data = newdata;
        } else {
          state.error = action.payload.msg;
        }
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.error = action.payload.msg;
      })
      .addCase(completeTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeTodos.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.data._id;
        let newdata = JSON.parse(JSON.stringify(state.data));
        if (action.payload.success === true) {
          const completedtodo = newdata.find((ele) => ele._id == id);

          if (completedtodo) {
            completedtodo.iscompleted = action.payload.data.iscompleted;

            state.data = newdata; // Update the state with the modified array
          }
        } else {
          state.error = action.payload.msg;
        }
      })
      .addCase(completeTodos.rejected, (state, action) => {
        state.error = action.payload.msg;
      })
      .addCase(editTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.data._id;
        let newdata = JSON.parse(JSON.stringify(state.data));
        if (action.payload.success === true) {
          const edittodo = newdata.find((ele) => ele._id == id);
          console.log(edittodo);
          if (edittodo) {
            edittodo.name = action.payload.data.name;

            state.data = newdata; // Update the state with the modified array
          }
        }
      }).addCase(editTodos.rejected,(state, action) => {
        state.error = action.payload.msg;
      });
  },
});

export default todoSlice.reducer;
