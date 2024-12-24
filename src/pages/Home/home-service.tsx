import { useForm } from "react-hook-form"
import { HomeView } from "./home-view"
import { SearchInputType, SearchOutputType, searchSchema, SearchType } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { SearchGateway } from "@/gateways";
import { Api } from "@/gateways/axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const HomeService = () => {
   const searchGateway = new SearchGateway(Api)
   const [response, setResponse] = useState<any | null>(null);
   const formMethods = useForm<
      SearchInputType,
      unknown,
      SearchOutputType
   >({
      mode: 'onSubmit',
      resolver: zodResolver(searchSchema)
   })
   const { toast } = useToast()

   const { mutateAsync, isLoading } = useMutation({
      mutationFn: async (data: SearchType) => await searchGateway.get(data),
      onSuccess: (data) => setResponse(data),
      onError: () => toast({
         title: "Error",
         description: "An error occurred while fetching data",
         variant: "destructive"
      })
   })

   const onSubmit = async (data: SearchType) => {
      await mutateAsync(data)
   }

   return (
      <HomeView
         formMethods={formMethods}
         onSubmit={onSubmit}
         isLoading={isLoading}
         weatherData={response}
      />
   )
}