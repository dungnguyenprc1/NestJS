// export function StandardizedList<T>(type: Type<T>): Type<GetManyResponse<T>> {
//   class Response<D> implements GetManyResponse<D> {
//     @ApiProperty({ type, isArray: true })
//     data!: D[];

//     @ApiProperty()
//     metadata!: IPaginationMeta;
//   }

//   Object.defineProperty(Response, 'name', {
//     value: `${type.name}List`,
//   });

//   return Response;
// }
