import AuthRequired from "../wrapper/AuthRequired";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

import { EyeIcon, Save } from "lucide-react";

const Home = () => {
  return (
    <>
      <AuthRequired>
        <Navbar />

        <div className="w-[70vw] h-fit px-6 py-6 gap-2 flex items-center bg-surface-subtle rounded-xl border border-border-subtle justify-between mx-auto mt-15 select-none">
          <div className="flex flex-col gap-1 items-start justify-center w-fit">
            <span className="text-2xl font-bold">
              Developer Portfolio & Skills
            </span>
            <span className="text-text-dimmed text-xs">
              Keep your skills and deliverables updated to maximize
              recommendation ranking by client project algorithms.
            </span>
          </div>

          <div className="w-fit flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              btnText="Preview"
              leadingIcon={EyeIcon}
              size="sm"
              fullWidth={false}
            />
            <Button
              variant="primary"
              btnText="Save Profile"
              leadingIcon={Save}
              size="sm"
              fullWidth={false}
            />
          </div>
        </div>

        
      </AuthRequired>
    </>
  );
};

export default Home;
