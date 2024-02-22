import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function ParamsPanel(props) {
  let { onChange } = props;
  let [params, setParams] = useState(props.params);
  return (
    <>
      <div className="rounded bg-white bg-opacity-60 p-2">
        <div className="flex items-center p-1 text-xs">
          <div className="w-20">输出格式:</div>
          <RadioGroup
            className="grid-flow-col"
            orientation="horizontal"
            value={params.format}
            onValueChange={(value) => {
              params["format"] = value;
              setParams({ ...params, format: value });
              onChange(params);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="origin" id="format1" />
              <Label htmlFor="format1">原格式</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="format2" />
              <Label htmlFor="format2">PNG</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jpg" id="format3" />
              <Label htmlFor="format3">JPG</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="webp" id="format4" />
              <Label htmlFor="format4">WEBP</Label>
            </div>
            {/* <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3"></Label>
              </div> */}
          </RadioGroup>
        </div>
        {/* <Separator className="my-1 bg-gray-200" /> */}
        {/* <div className="flex items-center p-1 text-xs">
          <div className="flex flex-1 items-center">
            <div className="w-24">宽度限制:</div>
            <Select
              value={params.crop}
              defaultValue={params.crop}
              onValueChange={(value) => {
                params["crop"] = value;
                setParams({ ...params, crop: value });
                onChange(params);
              }}
            >
              <SelectTrigger className="h-6 bg-white">
                <SelectValue placeholder="点击选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">不限</SelectItem>
                  <SelectItem value="mw2400">2400px</SelectItem>
                  <SelectItem value="mw1920">1920px</SelectItem>
                  <SelectItem value="mw1280">1280px</SelectItem>
                  <SelectItem value="mw900">900px</SelectItem>
                  <SelectItem value="mw750">750px</SelectItem>
                  <SelectItem value="mw250">250px</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-2 flex flex-1 items-center">
            <div className="w-24">大小限制:</div>
            <Select
              value={params.size}
              defaultValue={params.size}
              onValueChange={(value) => {
                params["size"] = value;
                setParams({ ...params, size: value });
                onChange(params);
              }}
            >
              <SelectTrigger className="h-6 bg-white py-0">
                <SelectValue placeholder="点击选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">不限</SelectItem>
                  <SelectItem value="kb100">100KB</SelectItem>
                  <SelectItem value="kb200">200KB</SelectItem>
                  <SelectItem value="kb300">300KB</SelectItem>
                  <SelectItem value="kb500">500KB</SelectItem>
                  <SelectItem value="mb1">1MB</SelectItem>
                  <SelectItem value="mb2">2MB</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}
        {/* <Separator className="my-1 bg-gray-200" />
        <div className="flex items-center p-1 text-xs">
          <div className="w-20">输出位置:</div>
          <RadioGroup
            value={params.target}
            className="grid-flow-col"
            orientation="horizontal"
            onValueChange={(value) => {
              params["target"] = value;
              setParams({ ...params, target: value });

              onChange(params);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="replace" id="target1" />
              <Label htmlFor="target1">替换</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rename" id="target2" />
              <Label htmlFor="target2">重命名</Label>
            </div>
          </RadioGroup>
        </div> */}
      </div>
    </>
  );
}
