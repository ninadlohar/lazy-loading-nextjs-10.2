const ParseToken = (token) => {
    return decodeURIComponent(token).replace(/%20/g, " ");
  };
  
  const API_URL = "https://api.boatzon.com/api";
  
  const AuthPassword =
    "&jno-@8az=wSo*NHYVGpF^AQ?4yn36ZvW5ToUCUN+XGOuC?sz#SE$oxXVbwQGP|3WFyjcTAj2SIRQnLE|vo^-|-ATV5FZUf2*5A3Oiu|_EOMmG==&iApzQL3R7HHQj?jtb0mc2mT$Y%Isrgrxveld#Z^g3-ul^|0xAITganIuF23J0waSa6z6aP_+%De5LqtuY&ptx?qhZySECdyE^*4R^b*hFjQ-9?cCSJNfROzztEYbRyN=SqDyhhpzSmmP|Eb";
  
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU3YjBmOGUzOThhM2VkNDRmZjI4NCIsImRldmljZUlkIjoiMTIzIiwibmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjY4MTg0ODQ3LCJleHAiOjE2NzMzNjg4NDd9.dWY66hZBDDlZddFFu-F0Y7xvmEPJ8yxKu-mh7TL5K60";
  
  export const getManufacturers = async (limit, offset) => {
    let payload = {
      limit: limit,
      type: "1",
      offset: offset,
    };
    let data = await fetch(
      `${API_URL}/getManufacture?type=${payload.type}&limit=${payload.limit}&offset=${payload.offset}`,
      {
        method: "GET",
        headers: {
          authorization: "Basic " + new Buffer.from("basicAuth:" + AuthPassword).toString("base64"),
          token: ParseToken(token),
          lan: "en",
          "Content-Type": "application/json",
        },
      }
    );
    let result = await data.json();
    return result;
  };
  