import { AspectRatio } from "@/components/ui/aspect-ratio";

// import {
//   EyeIcon,
//   FolderIcon,
//   Plus,
//   PlusSquareIcon,
//   SaveIcon,
// } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { buttonVariants } from "../ui/button";

function formatFileSize(bytes) {
  if (!bytes) {
    return "-";
  }
  if (bytes === 0) {
    return "0 Byte";
  }
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let index = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
}

export default function TasksPanel(props) {
  let { files } = props;
  return files.map((file) => (
    <div key={file.hash}>
      <div className="my-1 flex items-center rounded   p-1 ">
        <div className="h-8 w-8">
          <AspectRatio ratio={1} className="flex h-8 w-8 items-center">
            <img src={file.src} className=" w-8 rounded-md object-cover" />
          </AspectRatio>
        </div>
        <div className="mx-1 flex-1 text-sm">
          <div>{file.name}</div>
          <div className="text-xs font-black">
            <span>原始大小{formatFileSize(file.osize)}</span>
            <span className="ml-4">处理后{formatFileSize(file.nsize)}</span>
          </div>
        </div>
        <div className="flex items-center">
          {file.nsize && (
            <div className="font-black text-green-700">
              -{Math.round(((file.osize - file.nsize) / file.osize) * 100)} %
            </div>
          )}
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-1 py-2">
                  <EyeIcon className="h-4 w-4"></EyeIcon>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>预览图片</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <FolderIcon className="h-4 w-4"></FolderIcon>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>打开文件夹</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-1 py-2">
                  <PlusSquareIcon className="h-4 w-4"></PlusSquareIcon>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>另存为</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
    </div>
  ));
}
