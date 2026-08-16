import Button from "./components/common/Button";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Grievance AI
        </h1>

        <p className="mt-3 text-slate-500">
          Citizen grievance management platform
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button>Submit Grievance</Button>

          <Button variant="secondary">
            Track Grievance
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;