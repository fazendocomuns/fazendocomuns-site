-- Atualiza photo_url / PDF dos livros para URLs públicas do Storage
-- (fotos em fotos/equipes/*, PDFs em livros/livros/*)

UPDATE public.pesquisadores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/LuciaRabelloDeCastro-Perfil.jpg' WHERE slug = 'lucia-rabello';

UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/AdelaideRezendeDeSouza-Perfil.jpg' WHERE slug = 'adelaide-rezende';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/AnaLeticiaLimaSilva-Perfil.jpg' WHERE slug = 'ana-leticia-lima';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/DaviAlvesDeAbreu-Perfil.jpg' WHERE slug = 'davi-alves';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/EricaDosSantosVieira-Perfil.jpg' WHERE slug = 'erica-vieira';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/FlaviaChrispino-Perfil.jpg' WHERE slug = 'flavia-chrispino';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/GabrielaFernandesCastro-Perfil.jpg' WHERE slug = 'gabriela-castro';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/GieselaMariaSchopkeMarquesTalon-Perfil.png' WHERE slug = 'giesela-talon';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/IsysBoosVieira-Perfil.png' WHERE slug = 'isys-boos';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/JuliaJunqueiraCastillo-Perfil.png' WHERE slug = 'julia-junqueira';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/JuliaMoraes-Perfil.jpg' WHERE slug = 'julia-moraes';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/LaraDeOliveiraMoreira-Perfil.jpg' WHERE slug = 'lara-moreira';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/LuanGallGagliardi-Perfil.png' WHERE slug = 'luan-gagliardi';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/LucasAraujoDeJesusMeirelesDeAbreu-Perfil.png' WHERE slug = 'lucas-abreu';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/MariaClaraDeLimaCaiaffaDosSantos-Perfil.jpg' WHERE slug = 'maria-clara-caiaffa';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/MariliaFernandaGarciaCosta-Perfil.png' WHERE slug = 'marilia-costa';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/MichaelSantanaDaPaz-Perfil.png' WHERE slug = 'michael-paz';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/PaulaPimentelTumolo-Perfil.png' WHERE slug = 'paula-tumolo';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/PedroSaCampelloQueiroz-Perfil.png' WHERE slug = 'pedro-queiroz';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/RenataTavares-Perfil.png' WHERE slug = 'renata-tavares';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/SofiaHengen-Perfil.png' WHERE slug = 'sofia-hengen';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/SofiaMitieKanashiroManzatto-Perfil.png' WHERE slug = 'sofia-manzatto';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/SophiaAguiarGimenezCorrea-Perfil.png' WHERE slug = 'sophia-aguiar';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/VictoriaBersanBarbalhoMaia-Perfil.png' WHERE slug = 'victoria-maia';
UPDATE public.assistentes SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/equipe/Vinicius-Perfil.png' WHERE slug = 'vinicius-vila-nova';

UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/AndreaSzulc-Perfil.jpg' WHERE slug = 'andrea-szulc';
UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/ConceicaoFirminaSeixasSilva-Perfil.png' WHERE slug = 'conceicao-seixas';
UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/HeloisaDiasBezerra-Perfil.jpg' WHERE slug = 'heloisa-bezerra';
UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/JulianaSiqueiraDeLara-Perfil.jpg' WHERE slug = 'juliana-lara';
UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/LucianaGageiroCoutinho-Perfil.jpg' WHERE slug = 'luciana-gageiro';
UPDATE public.consultores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/consultores/ValeriaLlobet-Perfil.jpg' WHERE slug = 'valeria-llobet';

UPDATE public.colaboradores SET photo_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/fotos/equipes/colaboradores/1WXWCHcPGqI6gM_LiL4EctJYvmTZaKnUL.jpg' WHERE slug = 'ana-paula-pedro';

UPDATE public.livros SET read_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/fazendo-comuns-na-escola-construir-um-mundo-outro.pdf', download_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/fazendo-comuns-na-escola-construir-um-mundo-outro.pdf' WHERE slug = 'recrear-mundos-outros';
UPDATE public.livros SET read_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Manifesto-das-Professoras.pdf', download_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Manifesto-das-Professoras.pdf' WHERE slug = 'manifesto-das-professoras';
UPDATE public.livros SET read_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Jornalzinho-DB.pdf', download_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Jornalzinho-DB.pdf' WHERE slug = 'jornalzinho-da-escola-db';
UPDATE public.livros SET read_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Livrinhos-Projeto-CombinAcao.pdf', download_url = 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Livrinhos-Projeto-CombinAcao.pdf' WHERE slug = 'livretos-projeto-combinacao';
