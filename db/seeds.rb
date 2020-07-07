# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do
  team = Team.create(
    name: Faker::Company.name,
    description: Faker::Lorem.sentence(word_count: 10),
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.phone_number
  )

  slots = []
  clients = []
  managers = []
  
  5.times do
    manager = team.managers.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.phone_number,
      job_title: Faker::Job.title
    )
    managers << manager

    5.times do 
      slot = Slot.create(
        name: Faker::House.room,
        description: Faker::Lorem.sentence(word_count: 10),
        shareable: Faker::Boolean.boolean(true_ratio: 0.2),
        manager_id: manager.id,
        team_id: team.id
      )
      slots << slot
    end
  end

  10.times do
    client = Client.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.phone_number,
      cycle: Faker::Number.between(from: 20, to: 40),
      duration: Faker::Number.between(from: 1, to: 20),
    )
    clients << client
  end

  5.times do
    start_at = Faker::Date.in_date_period
    Visit.create(
      starts_at: start_at,
      ends_at: start_at + 10.days,
      client_id: clients[Faker::Number.between(from: 0, to: clients.size - 1)].id,
      slot_id: slots[Faker::Number.between(from: 0, to: slots.size - 1)].id,
    )
  end

  5.times do
    Serve.create(
      manager_id: managers[Faker::Number.between(from: 0, to: managers.size - 1)].id,
      client_id: clients[Faker::Number.between(from: 0, to: clients.size - 1)].id,
    )
  end
end



