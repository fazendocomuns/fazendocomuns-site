export type FotosGalleryColor = 'amber' | 'red' | 'orange' | 'yellow'

export interface FotosGallery {
  id: string
  title: string
  href: string
  color: FotosGalleryColor
  cover: string
  images: string[]
}

export const fotosContent = {
  title: 'Fotos',
  intro:
    'Registros fotográficos de pesquisas de campo, eventos e atividades nas escolas públicas.',
  galleries: [
    {
      id: 'atividades-em-roda',
      title: 'Atividades em roda',
      href: '/multimidia/fotos/atividades-em-roda',
      color: 'amber',
      cover: 'https://static.wixstatic.com/media/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_a4209e11b84246f2b8b31a7847a7a9b9~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_a4209e11b84246f2b8b31a7847a7a9b9~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_4ecb1f4d53644e449c88a754807848ed~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4ecb1f4d53644e449c88a754807848ed~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_517cf1b47a8043fcb8ac65166485b358~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_517cf1b47a8043fcb8ac65166485b358~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_099f134fd63d4819b02e562d3086fc13~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_099f134fd63d4819b02e562d3086fc13~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_80625f09ed1c4d5abe734c6d8a43a122~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_80625f09ed1c4d5abe734c6d8a43a122~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_1f37f32770e341598a9b5c3f05f14960~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_1f37f32770e341598a9b5c3f05f14960~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_ec1cc121d8d844cb9fba957b9d516e27~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_ec1cc121d8d844cb9fba957b9d516e27~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_c7aa5c190b4248d4ac4b1a0583f6356e~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_c7aa5c190b4248d4ac4b1a0583f6356e~mv2.jpeg',
      ],
    },
    {
      id: 'aula-e-palestra',
      title: 'Aula e Palestra',
      href: '/multimidia/fotos/aula-e-palestra',
      color: 'red',
      cover: 'https://static.wixstatic.com/media/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_1271edd09dae469e88d1d943fd827ec9~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_1271edd09dae469e88d1d943fd827ec9~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_607844141cf64ec1b1f73f67bed2df39~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_607844141cf64ec1b1f73f67bed2df39~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_510874580feb4f38863320cc388f9ffc~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_510874580feb4f38863320cc388f9ffc~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_8e836aa8de9c4f94afeeda95a8a5e36b~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_8e836aa8de9c4f94afeeda95a8a5e36b~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_2489375310934417bd68b1ab448c1997~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2489375310934417bd68b1ab448c1997~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_1d52e3b1b43f454b873e0247ff92fa00~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_1d52e3b1b43f454b873e0247ff92fa00~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_f8c126c223b04407b6671a8434f87f23~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_f8c126c223b04407b6671a8434f87f23~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_27e5f6731895434c9f6454c1ccb1c582~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_27e5f6731895434c9f6454c1ccb1c582~mv2.jpg',
      ],
    },
    {
      id: 'brincadeira',
      title: 'Brincadeira',
      href: '/multimidia/fotos/brincadeira',
      color: 'orange',
      cover: 'https://static.wixstatic.com/media/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_81dd7dfd51274aee9e89175aec23306d~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_81dd7dfd51274aee9e89175aec23306d~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_0338ae1bfacb46938b108834f1a46e06~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_0338ae1bfacb46938b108834f1a46e06~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_2c83df1ff1cc4e37b55545e88870f246~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2c83df1ff1cc4e37b55545e88870f246~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_6da01622f6574eb893d8e6446e0a073a~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_6da01622f6574eb893d8e6446e0a073a~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_7e912a09539e4c93902be01cf421752b~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_7e912a09539e4c93902be01cf421752b~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_9a5e20b90ec648e590fab3c28b56f37d~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_9a5e20b90ec648e590fab3c28b56f37d~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_904a3b0eb037418da443a4c3805c0422~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_904a3b0eb037418da443a4c3805c0422~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_f2bca61df99a421da10fd42afdf69f93~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_f2bca61df99a421da10fd42afdf69f93~mv2.jpeg',
      ],
    },
    {
      id: 'cartazes-sobre-recreio',
      title: 'Cartazes sobre Recreio',
      href: '/multimidia/fotos/cartazes-sobre-recreio',
      color: 'yellow',
      cover: 'https://static.wixstatic.com/media/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_de729c67036c409fa637d54234d27aa0~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_de729c67036c409fa637d54234d27aa0~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_7a5af8f0de11430b96c6234b51e69ed5~mv2.png/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_7a5af8f0de11430b96c6234b51e69ed5~mv2.png',
        'https://static.wixstatic.com/media/92a7cc_cd5259a30beb42dab168803a2b352575~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_cd5259a30beb42dab168803a2b352575~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_237ce2bebeda491ea37f1794e6c26ce4~mv2.png/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_237ce2bebeda491ea37f1794e6c26ce4~mv2.png',
        'https://static.wixstatic.com/media/92a7cc_393d3f3b39b24a79965efc8ee58d12fe~mv2.png/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_393d3f3b39b24a79965efc8ee58d12fe~mv2.png',
        'https://static.wixstatic.com/media/92a7cc_88b1a130e9cd464ab7b9a528cf934a94~mv2.png/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_88b1a130e9cd464ab7b9a528cf934a94~mv2.png',
        'https://static.wixstatic.com/media/92a7cc_f61dcc97737b404bb6c7f4dfb161bd1e~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_f61dcc97737b404bb6c7f4dfb161bd1e~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_8ad92f117b60452a9443e4923dfe27e4~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_8ad92f117b60452a9443e4923dfe27e4~mv2.jpg',
      ],
    },
    {
      id: 'corredores-salas-e-murais',
      title: 'Corredores, Salas e Murais',
      href: '/multimidia/fotos/corredores-salas-e-murais',
      color: 'amber',
      cover: 'https://static.wixstatic.com/media/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_4b9ddb13d8c84fc092a1db8e06d15e4c~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b9ddb13d8c84fc092a1db8e06d15e4c~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_32283e12d1234b51a8490000792a4010~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_32283e12d1234b51a8490000792a4010~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_99d50d7c59474413ba5a728b61fefaf4~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_99d50d7c59474413ba5a728b61fefaf4~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_f7821fcfcee3479e8223e48e5243572f~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_f7821fcfcee3479e8223e48e5243572f~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_22506e2bbed84bbfbb46a9acf8ca770c~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_22506e2bbed84bbfbb46a9acf8ca770c~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_dcf059a7765f466b88cb13d6533556b5~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_dcf059a7765f466b88cb13d6533556b5~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_bae58baffc414eefa976f12454594cab~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_bae58baffc414eefa976f12454594cab~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_e9835d2fb20644369e9a436353740cb5~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_e9835d2fb20644369e9a436353740cb5~mv2.jpeg',
      ],
    },
    {
      id: 'fazendo-comuns-desenho-logo',
      title: 'Fazendo Comuns (desenho logo)',
      href: '/multimidia/fotos/fazendo-comuns-desenho-logo',
      color: 'red',
      cover: 'https://static.wixstatic.com/media/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_47e2f32e92844c45aab7d6496f4966fa~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_47e2f32e92844c45aab7d6496f4966fa~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_812de4d484294b6eaa7f5b3950d4f5d0~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_812de4d484294b6eaa7f5b3950d4f5d0~mv2.jpeg',
        'https://static.wixstatic.com/media/92a7cc_0db80b9a36c44f549be272b4e877888f~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_0db80b9a36c44f549be272b4e877888f~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_cc0db457bf674c0f88507f5f388f582c~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_cc0db457bf674c0f88507f5f388f582c~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_3f74a98bd7354adca6218a24732a5f9d~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3f74a98bd7354adca6218a24732a5f9d~mv2.jpg',
      ],
    },
    {
      id: 'home-do-site',
      title: 'Home do Site',
      href: '/multimidia/fotos/home-do-site',
      color: 'orange',
      cover: 'https://static.wixstatic.com/media/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg',
      images: [
        'https://static.wixstatic.com/media/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_42e30f9ec070471496076a45e53731e8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_42e30f9ec070471496076a45e53731e8~mv2.jpg',
        'https://static.wixstatic.com/media/92a7cc_f23d9d50e4384ec59f65b6fbbb6d0e33~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_f23d9d50e4384ec59f65b6fbbb6d0e33~mv2.jpg',
      ],
    },
  ] satisfies FotosGallery[],
}

export function getFotosGalleryById(id: string): FotosGallery | undefined {
  return fotosContent.galleries.find((gallery) => gallery.id === id)
}
