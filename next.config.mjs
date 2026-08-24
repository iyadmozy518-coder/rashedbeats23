const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssmgbttiafgbpgstovbj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;