// import { TabsContent } from "@radix-ui/react-tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Edit, Heart } from "lucide-react";
// import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { Button } from "./ui/button";

// import { Avatar } from "./ui/avatar";
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// <TabsContent value="profile">
//             <div className="max-w-4xl space-y-6">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl">Shop Profiles</h2>
//                 <p className="text-muted-foreground">Manage your shop information</p>
//               </div>

//               <div className="space-y-6">
//                 {shops.map((shop: { id: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; image: any; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; contact: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; rating: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; totalProducts: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: number) => (
//                   <Card key={shop.id}>
//                     <CardHeader>
//                       <CardTitle className="flex items-center justify-between">
//                         <span>Shop {index + 1}: {shop.name}</span>
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => handleEditShop(shop)}
//                         >
//                           <Edit className="h-4 w-4 mr-2" />
//                           Edit Profile
//                         </Button>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-6">
//                       <div className="flex items-center gap-4">
//                         <Avatar className="w-16 h-16">
//                           <AvatarImage src={shop.image} />
//                           <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1">
//                           <h3 className="text-lg">{shop.name}</h3>
//                           <p className="text-muted-foreground">{shop.location}</p>
//                           <p className="text-sm text-muted-foreground">{shop.contact}</p>
//                         </div>
//                         <div className="text-right">
//                           <div className="flex items-center gap-1 text-sm">
//                             <Heart className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                             <span>{shop.rating}</span>
//                           </div>
//                           <p className="text-xs text-muted-foreground">{shop.totalProducts} products</p>
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground">{shop.description}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>

// function handleEditShop(_shop: any) {
//   throw new Error("Function not implemented.");
// }
