import { Plus } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#666666",
  borderStyle: "dashed",
  opacity: "0.6",
  backgroundColor: "#888888",
  color: "#ffffff",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function UploadArea({ onChange }) {
  // async function change(e) {
  //   var imageFiles = event.target.files;

  //   let options = {
  //     fileType: "image/jpeg",
  //     maxWidthOrHeight: 1024,
  //   };

  //   for (let imageFile of imageFiles) {
  //     let compressedFile = await imageCompression(imageFile, options);
  //     console.log(compressedFile);
  //   }
  // }
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      onChange(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );

      // const reader = new FileReader();

      // reader.onabort = () => console.log("file reading was aborted");
      // reader.onerror = () => console.log("file reading has failed");
      // reader.onload = () => {
      //   // Do whatever you want with the file contents
      //   const binaryStr = reader.result;
      //   console.log(binaryStr);
      // };
      // reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>
        <Plus></Plus>
      </p>
      <div className="text-xs font-black">点击选择或者拖入图片</div>
    </div>
  );
}
