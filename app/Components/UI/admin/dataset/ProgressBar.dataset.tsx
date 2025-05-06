interface ProgressBarProps {
    level: number;
  }
  
  export default function ProgressBarDataSet({ level }: ProgressBarProps) {
    return (
      <div className="h-2 w-full bg-main/30 rounded-2xl my-2 relative">
        <div
          style={{ width: `${Math.min(level * 20, 100)}%` }}
          className="bg-main h-full rounded-2xl"
        ></div>
      </div>
    );
  }
  