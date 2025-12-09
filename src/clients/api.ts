import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzgyNzQ0ZGY2YjdjZjQyZDg4OTAxYyIsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxQG1lLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTc2NTI5NjgxNCwiZXhwIjoxNzY1MzgzMjE0fQ.ULrVSBFIeamFjtQAXYi5GILOtjhxlmrIdYm07CI6A7w"
    }
});