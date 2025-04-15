"use client"

import { Card } from "@/components/ui/card"
import { CreditCard, Wifi } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Value } from "@radix-ui/react-select"
import { TabsContent } from "@radix-ui/react-tabs"
import { Image } from "@/types"

interface NFCCardPreviewProps {
  logo: Image
  brandColor: string
  qrcode: string
  side: "front" | "back"
}

export default function NFCCardPreview({ logo, brandColor, qrcode }: NFCCardPreviewProps) {

    const [activeTab, setActiveTab] = useState("front")

  return (
    
    <Tabs defaultValue="front" onValueChange={(Value) => setActiveTab(Value)}>
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="front">Front Side</TabsTrigger>
        <TabsTrigger value="back">Back Side</TabsTrigger>
      </TabsList>
      <TabsContent value="front" className="flex justify-center items-center p-2">
          <div className="w-[600px] h-[400px] flex items-center justify-center  rounded-lg border-none" style={{ backgroundColor: brandColor }}>

            <img src={logo.path} alt="" className="w-[250px] h-[250px] rounded-md overflow-hidden flex items-center justify-center border-4 object-cover" 
            style={{
                borderColor: brandColor
            }}
            
            />

          </div>
      </TabsContent>
      <TabsContent value="back" className="flex justify-center items-center">
        <div className="w-[600px] h-[400px] flex  flex-col items-center justify-center  rounded-lg border-none p-1" style={{ backgroundColor: brandColor }}>
        <div className="self-end border-none">
            <Wifi size={80} color="white" />
        </div>

        <img src={`/storage/${qrcode}`} alt="" className="w-[250px] h-[250px] rounded-md overflow-hidden flex items-center justify-center border-4 object-cover"
        style={{
            borderColor: brandColor
        }}
        />

        </div>
      </TabsContent>
    </Tabs>
  )
}
